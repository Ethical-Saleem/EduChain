import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordResetValidationSchema } from "@/app/utils/formValidations";
import CustomPasswordInput from "@/components/CustomPasswordInput";

import { AuthenticationService } from "@/app/services/AuthenticationService";
import { Demo } from "../../../../types";
import Link from "next/link";

const ResetPasswordPage = () => {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
            Reset Password Page
        </div>
      </div>
    </div>
  )
};

export default ResetPasswordPage;
