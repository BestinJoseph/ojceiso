import {StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
    ncrOne: {
        padding: '2rem 1rem 0 0',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: '2rem',
        position: 'relative',

        ncrConatiner: {
            maxWidth: '800px',
            width: '800px',
            border: '1px salmon solid',
            margin: '1rem 0 2rem',

            ncrRefandDateSection: {
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',

                ncrRefSection: {
                    border: '1px salmon solid',
                    display: 'grid',
                    gridTemplateColumns: '.30fr 1fr',
                    padding: '.25rem',
                },

                ncrDateSection: {
                    border: '1px salmon solid',
                    display: 'grid',
                    gridTemplateColumns: '.30fr 1fr',
                    padding: '.25rem',
                },

                ncrSignCorrection: {
                    border: '1px salmon solid',
                    display: 'grid',
                    gridTemplateColumns: '.40fr 1fr',
                    padding: '.25rem',
                },

                ncrSignImplemented: {
                    border: '1px salmon solid',
                    display: 'grid',
                    gridTemplateColumns: '.55fr 1fr',
                    padding: '.25rem',
                },

                ncrTypeSection: {
                    border: '1px salmon solid',
                    display: 'grid',
                    gridTemplateColumns: '.30fr 1fr',
                    padding: '.25rem',
                },

                ncrReqRefSection: {
                    border: '1px salmon solid',
                    display: 'grid',
                    gridTemplateColumns: '.30fr 1fr',
                    padding: '.25rem',
                },

                ncrSignificanceSection: {
                    border: '1px salmon solid',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    padding: '.25rem',
                },

                ncrSignatureandRaisedAtSection: {
                    border: '1px salmon solid',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    padding: '.25rem',

                    ncrSignRaised: {
                        display: 'grid',
                        gridTemplateColumns: '.30fr 1fr',
                    },

                    ncrTargetDate: {
                        display: 'grid',
                        gridTemplateColumns: '.85fr 1fr',
                    },
                },
                
                ncrCorrectionVerficationSection: {
                    border: '1px salmon solid',
                    display: 'grid',
                    gridTemplateColumns: '1fr .25fr',
                    padding: '.25rem',
                    background: 'red',
                },
            },

            ncrCorrectionVerficationSection: {
                border: '1px salmon solid',
                display: 'grid',
                gridTemplateColumns: '1fr .33fr',
                padding: '.25rem',

                ncrVerifiedBy: {
                    display: 'grid',
                    gridTemplateColumns: '1fr .5fr',
                },

                ncrVerifiedDate: {
                    display: 'grid',
                    gridTemplateColumns: '.85fr 1fr',
                },
            },

            ncrSupportAndCloseOutSection: {
                border: '1px salmon solid',
                display: 'grid',
                gridTemplateColumns: '1fr .8fr',
                padding: '.25rem',

                ncrVerifiedBy: {
                    display: 'grid',
                    gridTemplateColumns: '1fr .5fr',
                },

                ncrVerifiedDate: {
                    display: 'grid',
                    gridTemplateColumns: '.85fr 1fr',
                },
            },

            ncrDetailsContainer: {
                border: '1px salmon solid',

                ncrDetailsContentSection: {
                    height: '125px',
                    padding: '.25rem',

                    p: {
                        marginBottom: '.5rem',
                    }
                }
            }
        }
    }
})