export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

export type LanguageType = "zh" | "ch" | null;

export type AssemblySizeType = "large" | "default" | "small";

export interface GlobalState {
    layout: LayoutType;
    assemblySize: AssemblySizeType;
    language: LanguageType;
}
