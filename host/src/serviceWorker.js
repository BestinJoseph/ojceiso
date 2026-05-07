export default function swDev () {
    let swUrl = `${process.env.REACT_APP_PUBLIC_URL}sw.js`
    navigator.serviceWorker.register(swUrl).then( (res) => {
        console.warn("res: ", res)
    }).catch( err => {
        console.log(err)
    })
}