export interface ICreateSectionUICredentials {
  code: string;
  componentKey: string; // Internal key for component mapping (immutable)
  type: string;
  propertyFormat: Record<string, unknown>;
}

export interface IUpdateSectionUICredentials {
  code?: string;
  // componentKey should NOT be updated - it's immutable
  type?: string;
  propertyFormat?: Record<string, unknown>;
}

export interface ISectionUICredentialsResponse {
  id: string;
  code: string;
  componentKey: string;
  type: string;
  propertyFormat: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
