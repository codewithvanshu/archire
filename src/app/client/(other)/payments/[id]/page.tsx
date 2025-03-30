import PaymentForm from "@/components/common/payment-form";
import { makePayment } from "@/actions/makePayment";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase-server";
export default async function ClientPaymentPage({ params }: { params: { id: string } }) {
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Make Payment for Contract {params.id}</h1>
      <PaymentForm
        onSubmit={async (data) => {
          "use server";
          await makePayment({ contractId: params.id, userId: user.id, amount: data.amount });
        }}
      />
    </div>
  );
}