import React, { Fragment } from 'react';

const Spinner = () => {
    return (
        <Fragment>
            <div
                className="spinner-border text-dark"
                role="status"
                style={{ margin: 'auto', display: 'block' }}
            >
                <span className="sr-only">Loading...</span>
            </div>
        </Fragment>
    );
};

export default Spinner;
