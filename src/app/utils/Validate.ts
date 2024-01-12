import { ObjectId } from "bson";

export interface IValidationResult {
  isValid: boolean;
  message?: string;
}

export class Validate {
  /* Validates if a value is present in an enum */
  public static againstValidEnums(
    argument: any,
    argumentName: string
  ): IValidationResult {
    const result = Object.values(argument).includes(argumentName);

    if (result === true) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        message: `${argumentName} is not a valid enum.`,
      };
    }
  }

  public static againstInvalidObjectId(id: string, argumentName: string): IValidationResult {
    if (!id) {
      return { isValid: false, message: `${argumentName} is null or undefined` };
    }

    if (ObjectId.isValid(id)) {
      const objectId = new ObjectId(id);

      if (objectId.toString() === id) {
        return { isValid: true };
      }
    }
    return { isValid: false, message: `${argumentName} is not a valid ObjectId.` };
  }
}
