import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { PersonalDataProfileSkills } from "./graphql/types";
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
export declare type PersonalDataProfileSkillsUpdateFormInputValues = {};
export declare type PersonalDataProfileSkillsUpdateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonalDataProfileSkillsUpdateFormOverridesProps = {
    PersonalDataProfileSkillsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type PersonalDataProfileSkillsUpdateFormProps = React.PropsWithChildren<{
    overrides?: PersonalDataProfileSkillsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    personalDataProfileSkills?: PersonalDataProfileSkills;
    onSubmit?: (fields: PersonalDataProfileSkillsUpdateFormInputValues) => PersonalDataProfileSkillsUpdateFormInputValues;
    onSuccess?: (fields: PersonalDataProfileSkillsUpdateFormInputValues) => void;
    onError?: (fields: PersonalDataProfileSkillsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonalDataProfileSkillsUpdateFormInputValues) => PersonalDataProfileSkillsUpdateFormInputValues;
    onValidate?: PersonalDataProfileSkillsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PersonalDataProfileSkillsUpdateForm(props: PersonalDataProfileSkillsUpdateFormProps): React.ReactElement;
