import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Typography, icons } from "@eo/ui";

import { resendEmailVerification } from "~/api/email";
import { LayoutDefault } from "~/layouts/LayoutDefault";
import { ROUTES } from "~/router";

export const RegisterComplete = () => {
  const location = useLocation();
  const state = location.state as { email: string };
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: resendEmailVerification,
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success("Email has been resent");
      } else {
        toast.success("Email hasn't been resent");
      }
    },
  });

  useEffect(() => {
    if (!state?.email) {
      navigate(ROUTES.login);
    }
  }, [navigate, state]);

  return (
    <LayoutDefault>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Typography variant="large" className="mb-10 text-center">
          We’ve sent a verification email to {state?.email}.<br /> Please verify
          to continue.
        </Typography>
        <img
          className="w-[500px]"
          src="https://uploads-ssl.webflow.com/641990da28209a736d8d7c6a/644197b05bf126412b8799c4_woman-sat.svg"
          alt="Images showing women sat in a sofa, viewing her phone"
        />
        <Button
          className="mt-10"
          onClick={() => mutate(state.email)}
          left={<icons.EnvelopeIcon />}
        >
          Resend verification
        </Button>
      </div>
    </LayoutDefault>
  );
};
