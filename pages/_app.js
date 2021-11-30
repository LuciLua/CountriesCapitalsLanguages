import '../src/css/global.scss'

function App({ Component, pageProps }){
    return (
        <>
            <Component {...pageProps}/>
        </>
    )
}

export default App