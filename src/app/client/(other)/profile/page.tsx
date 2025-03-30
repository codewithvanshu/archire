import ProfileForm from "@/components/common/profile-form";
import { getClientProfile } from "@/actions/client/getClientProfile";
import { updateProfile } from "@/actions/updateProfile";

import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase-server";
export default async function ClientProfile() {
 const cookieStore = await  cookies();

  const supabase = createSupabaseServerClient({
    getCookie: (name) => cookieStore.get(name)?.value,
    setCookie: (name, value, options) => {
      cookieStore.set(name, value, options);
    },
    deleteCookie: (name, options) => {
      cookieStore.set(name, "", { ...options, maxAge: 0 });
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div>Please log in</div>;

  const profile = await getClientProfile(user.id);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Client Profile</h1>
      <ProfileForm
        initialData={profile}
        onSubmit={async (data) => {
          "use server";
          await updateProfile(user.id, {
            ...data,
            bio: data.bio || "",
            contactInfo: data.contactInfo || "",
          });
        }}
      />
    </div>
  );
}