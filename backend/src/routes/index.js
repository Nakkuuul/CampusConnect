import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import itemRoutes from '../modules/item/item.routes.js';
// Future modules slot in here:
// import userRoutes      from '../modules/user/user.routes.js';
// import claimsRoutes    from '../modules/claims/claims.routes.js';
// import dashboardRoutes from '../modules/dashboard/dashboard.routes.js';

const router = Router();

router.use('/auth',  authRoutes);
router.use('/item',  itemRoutes);
// router.use('/user',      userRoutes);
// router.use('/claims',    claimsRoutes);
// router.use('/dashboard', dashboardRoutes);

export default router;