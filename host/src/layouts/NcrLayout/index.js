import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createSearchParams, Link, Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import './NcrLayoutStyles.scss'
import NcrsList from '../../features/ncrs/NcrsList'
import NcrCreate from '../../features/ncrs/NcrCreate'
import NcrOne from '../../features/ncrs/NcrOne'
import UpdateNcr from '../../features/ncrs/UpdateNcr'
import NcrImmediateUpdateForm from '../../features/ncrs/NcrImmediateUpdateForm'

const NcrLayout = () => {
    const ncrNavs = ['new ncr', 'all', 'closed', 'immediateAction', 'correctiveAction', 'verification', ]
    const [select, setSelect] = useState('all')
    const params = useParams()
    const location = useLocation()
    const paramPath = location.pathname.split('/')[4]
    const ncrLayoutRef = useRef(false)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const type = searchParams.get('type') || 'all'
    const ncrId = searchParams.get('ncr')
    const action = searchParams.get('action')

    const handleNcrManagerNav = (nNav) => {
        setSearchParams({type: nNav})
        setSelect(nNav)
    }

    // console.log(type)

    useEffect(()=>{
        let isSubscribed = true
        if(paramPath !== undefined || type !== null && isSubscribed ) {
            if(type) {
                return setSelect(type)
            }
            return setSelect(paramPath)
        }

        return () => isSubscribed = false
    },[paramPath, type, action])

    return (
        <div className='ncrLayout'>
            <div className='ncrNavs'>
                <div className='ncrNavHead'>
                    <h4>NCR Manager</h4>
                </div>
                {
                    ncrNavs && ncrNavs.map((nNav, i) => (
                        <Link className='ncrNavItemLink' key={i} >
                        <div onClick={ () => handleNcrManagerNav(nNav) } style={{ background: select === nNav ? '#FFFAFA' : 'inherit' }} className='ncrNavItem' >
                            {nNav}
                        </div>
                        </Link>
                    ))
                }
            </div>
            <div className='ncrContentSection'>
                {
                    (() => {
                        switch(select) {
                            case 'update':
                                return <NcrImmediateUpdateForm params={ncrId} rawaction={action} />
                            case 'new ncr':
                                return <NcrCreate />
                            case 'all':
                                return <NcrsList action={"all"} />
                            case 'view':
                                return <NcrOne params={params.id} setSearchParams={setSearchParams}/>
                            default:
                                return <NcrsList />
                        }
                    })()
                }
            </div>
        </div>
    )
}

export default NcrLayout
