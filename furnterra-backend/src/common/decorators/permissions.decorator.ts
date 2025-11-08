import { SetMetadata } from '@nestjs/common';
import { AdminPermission } from '../../modules/admin/admin.schema';

export const Permission = (...permissions: AdminPermission[]) =>
  SetMetadata('permissions', permissions);
