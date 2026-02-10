import mitt from 'mitt';

export type Events = {
    'show-toast': { message: string; type?: 'success' | 'error' | 'info' };
};

// @ts-ignore
const emitter = mitt<Events>();

export default emitter;
