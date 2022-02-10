import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../lib/firebase"

const vkConfig = {
    appId: "8075392",
    secureKey: "PoBdmFV929knZUII94kk",
    serviceToken: "dd5f50d5dd5f50d5dd5f50d521dd246855ddd5fdd5f50d5bf5b56ff90c94bd2a9f5e952",
    perms: "4194304",
    redirectURI: "http://127.0.0.1:3000/vk",
    version: "5.131"
};

export async function getServerSideProps({ query }){

    const code = query.code

    const request = async ( url, params = {}, method = 'GET' ) => {
        let options = {
            method
        };
        if ( 'GET' === method ) {
            url += '?' + ( new URLSearchParams( params ) ).toString();
        }
        
        const response = await fetch(url, options);
        return await response.json();
    };

    const get = ( url, params ) => request( url, params, 'GET' );
    // const post = ( url, params ) => request( url, params, 'POST' );

    const res = await get('https://oauth.vk.com/access_token', {
            client_id: vkConfig.appId,
            client_secret: vkConfig.secureKey,
            code: code,
            redirect_uri: vkConfig.redirectURI
        })

    return{
        props:{
            res
        }
    }

}


// This page recives a code as a parameter, then I should have a function to recive a token and uri, that I will use as username and password. 

export default function VkVerification({ res }) {

    console.log(res)

    signInWithEmailAndPassword(auth, res.email, res.user_id)

    return (
        <div className="grid place-items-center h-screen">
            {/* <h1 onClick={() => {
                router.push({
                    pathname: 'https://oauth.vk.com/authorize',
                    query: {
                        client_id: vkConfig.appId,
                        scope: vkConfig.perms,
                        redirect_uri: vkConfig.redirectURI,
                        response_type: "code",
                        v: vkConfig.version
                    }
                })
            }}>Get Code</h1> */}
            {/* <h1 onClick={() => {
            router.push({
                pathname: 'https://oauth.vk.com/access_token',
                query: {
                    client_id: vkConfig.appId,
                    client_secret: vkConfig.secureKey,
                    code: router.query.code,
                    redirect_uri: vkConfig.redirectURI
                }
            })
            }}>Get Token</h1> */}
        </div>
    )
}