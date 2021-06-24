import React, { forwardRef } from 'react';

const Loader = forwardRef(({ loading }, ref) => (
    <div ref={ref}>
        {loading &&
            <div className="row loader-container">
                <div className="column loader"></div>
                <div className="column loader"></div>
                <div className="column loader"></div>
                <div className="column loader"></div>
                <div className="column loader"></div>
            </div>
        }
    </div>
)
)

export default Loader