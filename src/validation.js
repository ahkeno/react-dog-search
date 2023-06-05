// Validate Respond Data Type are correct or Not
export const validate = (data) => {
    for (const pet of data) {
      if (
        typeof pet.id !== "number" ||
        typeof pet.name !== "string" ||
        typeof pet.life_span !== "string" ||
        typeof pet.weight !== "object" ||
        typeof pet.height !== "object" ||
        (pet.hasOwnProperty("image") ? typeof pet.image !== "object" : false) ||
        (pet.hasOwnProperty("reference_image_id")
          ? typeof pet.reference_image_id !== "string"
          : false)
      )
        return false;
    }
    return true;
  };