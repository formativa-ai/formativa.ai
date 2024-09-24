import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { PersonalDataProfile } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PersonalDataProfileUpdateFormInputValues = {
    picture?: string;
    personalityType?: string;
    userType?: string;
    owner?: string;
};
export declare type PersonalDataProfileUpdateFormValidationValues = {
    picture?: ValidationFunction<string>;
    personalityType?: ValidationFunction<string>;
    userType?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonalDataProfileUpdateFormOverridesProps = {
    PersonalDataProfileUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    picture?: PrimitiveOverrideProps<TextFieldProps>;
    personalityType?: PrimitiveOverrideProps<SelectFieldProps>;
    userType?: PrimitiveOverrideProps<SelectFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PersonalDataProfileUpdateFormProps = React.PropsWithChildren<{
    overrides?: PersonalDataProfileUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    personalDataProfile?: PersonalDataProfile;
    onSubmit?: (fields: PersonalDataProfileUpdateFormInputValues) => PersonalDataProfileUpdateFormInputValues;
    onSuccess?: (fields: PersonalDataProfileUpdateFormInputValues) => void;
    onError?: (fields: PersonalDataProfileUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonalDataProfileUpdateFormInputValues) => PersonalDataProfileUpdateFormInputValues;
    onValidate?: PersonalDataProfileUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PersonalDataProfileUpdateForm(props: PersonalDataProfileUpdateFormProps): React.ReactElement;
