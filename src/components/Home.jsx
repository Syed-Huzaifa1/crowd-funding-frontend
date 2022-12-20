import React, { Suspense } from 'react'


const Response = React.lazy(() => import('../layouts/Table'))
const Home = () => {
    return (
        <div>
            <h1 className='main-heading'>Funding Campaign</h1>
            <Suspense fallback={'Loading table'}>
                <Response />
            </Suspense>
        </div>
    )
}

export default Home;