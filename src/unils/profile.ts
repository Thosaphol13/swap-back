import { HttpException } from "@nestjs/common";
import axios from "axios";

export const verifyToken = async (token: string) => {
    try {
      const verify = await axios.post(process.env.LDAP_VERIFY, null, {
        headers: {
          Authorization: token,
        },
      });
      return verify.data;
    } catch (err) {
      throw new HttpException(err.response.data, err.response.status);
    }
  };