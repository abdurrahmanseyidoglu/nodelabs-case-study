import toast from "react-hot-toast";

export async function handleApiResponse(res: Response) {
  const data = await res.json();

  if (!res.ok || !data.success) {
    const message = data.message || "Request failed";
    toast.error(message);
    throw new Error(message);
  }
  return data;
}
