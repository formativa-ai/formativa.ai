import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ProgramaParticular } from "./graphql/types";
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
export declare type ProgramaParticularUpdateFormInputValues = {
    nombreDePrograma?: string;
    owner?: string;
};
export declare type ProgramaParticularUpdateFormValidationValues = {
    nombreDePrograma?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgramaParticularUpdateFormOverridesProps = {
    ProgramaParticularUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    nombreDePrograma?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProgramaParticularUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProgramaParticularUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    programaParticular?: ProgramaParticular;
    onSubmit?: (fields: ProgramaParticularUpdateFormInputValues) => ProgramaParticularUpdateFormInputValues;
    onSuccess?: (fields: ProgramaParticularUpdateFormInputValues) => void;
    onError?: (fields: ProgramaParticularUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProgramaParticularUpdateFormInputValues) => ProgramaParticularUpdateFormInputValues;
    onValidate?: ProgramaParticularUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProgramaParticularUpdateForm(props: ProgramaParticularUpdateFormProps): React.ReactElement;
