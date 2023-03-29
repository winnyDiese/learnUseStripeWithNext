
import { loadStripe } from "@stripe/stripe-js";

export async function checkout({lineItems}){
    let stripePromise =  null
    const getStripe = ()=>{

        if(!stripePromise)
            stripePromise = loadStripe("pk_test_51Mqm0SB30WBQB5yHWUjZlnz5Ykc1KyBcwNg1gCEAKBYxbKKaiyQ2CcAJt4Bnf7lmKe2IMl5orL37kZRb03PZeykz00erNMMA1I")
            // stripePromise = loadStripe(process.env.NextPublicApiKey)

        return stripePromise
    }
    const stripe = await getStripe()

    await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems, 
        successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.origin
    })
    .then(console.log('Success redirection'))
    .catch(err => console.log('Error --> ' + err))

}
