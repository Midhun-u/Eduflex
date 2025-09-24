import React from 'react'
import { ToastContainer , Bounce} from 'react-toastify'

const Toaster = () => {

    return (

        <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
            transition={Bounce}
        />

    )
}

export default Toaster