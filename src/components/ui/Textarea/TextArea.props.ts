export type TextAreaProps = {
    className?: string;
    label?: string;
    labelSmall?: boolean;
    disabled?: boolean;
    loading?: boolean;
    noResize?: boolean;
    description?: string;
    children?: string | any[];
    name?: string;
    placeholder?: string;
    value?: string;
    textAreaClassName?: string;
    required?: boolean;
    inputError?: boolean;

    rows?: number;
    maxLength?: number;

    regex?: RegExp;
    regexMatchEmpty?: boolean;
    regexCheckInitial?: boolean;
};
