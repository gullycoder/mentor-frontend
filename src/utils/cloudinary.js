import { apiCall } from "../services/apiCall";
import AsyncStorage from "@react-native-async-storage/async-storage";
//get signature to upload profile image
const getSignatureforProfileImage = async () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/files/getSinatureToUploadProfileImage`;
  try {
    const response = await apiCall(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.success) {
      throw new Error("Failed to get signature");
    }
    return response.data;
  } catch (error) {
    console.log("getSignatureforProfileImage -> error", error);
    return { message: "Failed to get signature", success: false };
  }
};

const uploadImage = async (imageUri) => {
  console.log("uploadImage -> imageUri", imageUri);
  try {
    // Fetch fresh signature and API key securely from the backend
    const { signature, timestamp, transformation, apiKey } =
      await getSignatureforProfileImage();
    const transformationString = JSON.stringify(transformation);

    if (!signature || !timestamp || !apiKey) {
      throw new Error("Failed to fetch a valid signature or API key.");
    }

    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("transformation", transformationString);
    formData.append("api_key", apiKey);

    const url = `${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}`;

    // Send the form data to Cloudinary upload UR
    //apicall causing error due to custom interceptor in apiCall

    //   const response = await apiCall(url, {
    //     method: "POST",
    //     data: formData,
    //   });
    //   console.log("uploadImage -> response", response);
    //   if (response.data.secure_url) {
    //     console.log("Uploaded Image URL:", response.data.secure_url);
    //     return response.data.secure_url; // Return the uploaded image URL
    //   } else {
    //     throw new Error("Upload failed, no secure URL returned.");
    //   }
    // } catch (error) {
    //   console.error("Error uploading image:", error);
    //   throw new Error("Image upload failed.");
    // }

    const response = await fetch(url, {
      method: "POST",
      body: formData, // Attach form data
    });

    // Check for response status
    const result = await response.json(); // Parse the response as JSON
    console.log("uploadImage -> response", result);

    if (response.ok && result.secure_url) {
      console.log("Uploaded Image URL:", result.secure_url);
      return result.secure_url; // Return the uploaded image URL
    } else {
      throw new Error(
        result.error?.message || "Upload failed, no secure URL returned."
      );
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed.");
  }
};

export { getSignatureforProfileImage, uploadImage };
