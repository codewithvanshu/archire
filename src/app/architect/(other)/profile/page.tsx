import ProfileForm from "@/components/common/profile-form";
import { getArchitectProfile } from "@/actions/architect/getArchitectProfile";
import { updateProfile } from "@/actions/updateProfile";

import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function ArchitectProfile() {
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

  const profile = await getArchitectProfile(user.id);

  if (!profile) return <div>Loading...</div>;

  const initialData = {
    name: profile.name || "",
    bio: profile.bio || "", // Default to empty string
    contactInfo: profile.contactInfo || "", // Default to empty string
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Architect Profile</h1>
      <ProfileForm
        initialData={initialData}
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