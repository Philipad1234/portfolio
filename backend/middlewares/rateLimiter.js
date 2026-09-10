import { rateLimit } from 'express-rate-limit';

const contactLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 5,
    message: {error: 'Too many requests, please try again later.'}
});

export default contactLimiter;
