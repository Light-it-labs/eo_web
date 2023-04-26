import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Typography } from "@eo/ui";

import { resendEmailVerification } from "~/api/email";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";

export const EmailVerificationLogged = () => {
  const location = useLocation();
  const { email } = location.state as { email: string };
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: resendEmailVerification,
    onSuccess: () => {
      toast.success("Email resent successfully, please check your inbox");
    },
    onError: (result) => {
      if (axios.isAxiosError(result)) {
      } else {
      }
    },
  });

  if (!email) {
    navigate(ROUTES.login);
  }

  return (
    <LayoutDefault>
      <div className="flex h-full h-full flex-col items-center justify-center">
        <Typography variant="large">
          Your email is not verified yet. Please check your inbox to activate.
        </Typography>
        <Button type="submit" className="mt-10" onClick={() => mutate(email)}>
          Resend Email Verification again.
        </Button>
      </div>
    </LayoutDefault>
  );
};
