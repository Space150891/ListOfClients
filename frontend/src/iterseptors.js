import store from './store';

export const response = (request, next) => {
    next(response => {
        if (response.status == 400 || response.status == 500) {
            store.dispatch("EMIT_NOTIFICATION",
                    {
                        message: response.body.errors,
                        status: 'error',
                        trigger: true
                    }
                );
        }
    })
};
