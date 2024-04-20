import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type CreateChargeApiV1BodyParam = FromSchema<typeof schemas.CreateChargeApiV1.body>;
export type CreateChargeApiV1MetadataParam = FromSchema<typeof schemas.CreateChargeApiV1.metadata>;
export type CreateChargeApiV1Response200 = FromSchema<typeof schemas.CreateChargeApiV1.response['200']>;
export type CreateChargeApiV1Response400 = FromSchema<typeof schemas.CreateChargeApiV1.response['400']>;
export type CreateChargeBodyParam = FromSchema<typeof schemas.CreateCharge.body>;
export type CreateChargeMetadataParam = FromSchema<typeof schemas.CreateCharge.metadata>;
export type CreateChargeResponse200 = FromSchema<typeof schemas.CreateCharge.response['200']>;
export type CreateChargeResponse400 = FromSchema<typeof schemas.CreateCharge.response['400']>;
