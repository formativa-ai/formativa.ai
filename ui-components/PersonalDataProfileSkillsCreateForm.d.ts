import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
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
export declare type PersonalDataProfileSkillsCreateFormInputValues = {};
export declare type PersonalDataProfileSkillsCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonalDataProfileSkillsCreateFormOverridesProps = {
    PersonalDataProfileSkillsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type PersonalDataProfileSkillsCreateFormProps = React.PropsWithChildren<{
    overrides?: PersonalDataProfileSkillsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PersonalDataProfileSkillsCreateFormInputValues) => PersonalDataProfileSkillsCreateFormInputValues;
    onSuccess?: (fields: PersonalDataProfileSkillsCreateFormInputValues) => void;
    onError?: (fields: PersonalDataProfileSkillsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonalDataProfileSkillsCreateFormInputValues) => PersonalDataProfileSkillsCreateFormInputValues;
    onValidate?: PersonalDataProfileSkillsCreateFormValidationValues;
} & React.CSSProperties>;
export default function PersonalDataProfileSkillsCreateForm(props: PersonalDataProfileSkillsCreateFormProps): React.ReactElement;
