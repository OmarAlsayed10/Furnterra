import { SetMetadata } from '@nestjs/common';
import { AdminPermission } from 'src/modules/admin/admin.schema';

export const Permission = (...permissions: AdminPermission[]) =>
  SetMetadata('permissions', permissions);
