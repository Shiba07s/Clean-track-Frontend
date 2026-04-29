/**
 * Report Pollution Page
 * Form to submit a new pollution report with image upload and preview.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, MapPin } from "lucide-react";
import axios from "axios";

const ReportPollution = () => {
  const navigate = useNavigate();

  // Form state
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
const [imageFile, setImageFile] = useState<File | null>(null);

  // Handle image selection and create preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (file) {
    setImageFile(file);   // store file for API

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  }
};
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     // Create a URL for image preview
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const fetchLocation = async (value) => {
  setLocation(value);

  if (value.length < 3) return;

  try {
    const res = await axios.get(
      "http://api.positionstack.com/v1/forward",
      {
        params: {
          access_key: "79486de0fe2800dfec366e0aea64c733",
          query: value,
          limit: 5
        }
      }
    );

    setSuggestions(res.data.data);

  } catch (error) {
    console.error("Location API error", error);
  }
};

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!description || !location || !imageFile) {
    alert("Please fill all fields and upload an image.");
    return;
  }

  try {
    const userId = localStorage.getItem("userId"); // or from auth context

    const formData = new FormData();

    formData.append("image", imageFile);
    formData.append("description", description);
    formData.append("location", location);

    const response = await axios.post(
      `http://localhost:1010/api/reports/create/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    console.log("Report Created:", response.data);

    setSubmitted(true);

    setTimeout(() => navigate("/my-reports"), 2000);

  } catch (error) {
    console.error("Error submitting report", error);
    alert("Failed to submit report");
  }
};
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!description || !location) {
  //     alert("Please fill in all fields.");
  //     return;
  //   }

  //   // Simulate submission (would use Axios in real app)
  //   console.log("Report submitted:", { description, location, imagePreview });
  //   setSubmitted(true);

  //   // Redirect after delay
  //   setTimeout(() => navigate("/my-reports"), 2000);
  // };

  // Show success message after submission
  if (submitted) {
    return (
      <div className="container-page text-center py-20">
        <div className="bg-success/10 border border-success/30 rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-success mb-2">Report Submitted!</h2>
          <p className="text-muted-foreground">
            Your pollution report has been submitted successfully. Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Report Pollution</h1>
        <p className="text-muted-foreground mb-8">
          Upload a photo and describe the pollution issue to file a report.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center bg-muted/30">
              {imagePreview ? (
                // Show preview if image is selected
                <div className="space-y-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="text-sm text-destructive hover:underline"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                // Show upload prompt
                <label className="cursor-pointer">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the pollution issue in detail..."
              rows={4}
              className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Location */}

          {/* <div>
  <label className="block text-sm font-medium mb-2">Location</label>

  <input
    type="text"
    value={location}
    onChange={(e) => fetchLocation(e.target.value)}
    placeholder="Search location..."
    className="w-full px-4 py-2 border rounded-md bg-background"
  />

   {suggestions.length > 0 && (
    <div className="border rounded-md mt-2 bg-white shadow">
      {suggestions.map((item, index) => (
        <div
          key={index}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setLocation(item.label);
            setSuggestions([]);
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )}
</div>  */}
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., MG Road, Bangalore"
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPollution;
