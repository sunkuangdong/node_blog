/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

import * as next from "next";
import { Session } from "next-iron-session";

declare module "next" {
    interface NextApiRequest {
        session: Session;
    }
}