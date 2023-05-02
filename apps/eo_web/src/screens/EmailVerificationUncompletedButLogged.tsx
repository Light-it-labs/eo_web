import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Typography, icons } from "@eo/ui";

import { resendEmailVerification } from "~/api/email";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";

export const EmailVerificationUncompletedButLogged = () => {
  const location = useLocation();
  const { email } = location.state as { email: string };
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: resendEmailVerification,
    onSuccess: () => {
      toast.success("Email resent successfully, please check your inbox");
    },
    onError: () => {
      toast.error("An error occurred, please try again later");
    },
  });

  if (!email) {
    navigate(ROUTES.login);
  }

  return (
    <LayoutDefault>
      <div className="flex h-full h-full flex-col items-center justify-center">
        <Typography variant="large" font="bold">
          It looks like you haven’t verified your email.{" "}
          <br className="hidden md:block" /> Try checking your junk or spam
          folders.
        </Typography>
        <img
          className="mt-4 w-[500px]"
          src="https://uploads-ssl.webflow.com/641990da28209a736d8d7c6a/644197b05bf126412b8799c4_woman-sat.svg"
          alt="Images showing women sat in a sofa, viewing her phone"
        />
        <Button
          type="submit"
          className="mt-10"
          onClick={() => mutate(email)}
          left={<icons.EnvelopeIcon />}
        >
          Resend verification
        </Button>
      </div>
    </LayoutDefault>
  );
};
