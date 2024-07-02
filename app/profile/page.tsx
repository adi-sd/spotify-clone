import Header from "@/components/header";
import AccountContent from "@/components/account-content";

export const revalidate = 0;

const Profile = async () => {
    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header>
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-x-5">
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                            <h1 className="text-white font-bold text-5xl sm:text-3xl lg:text-7xl">Account Settings</h1>
                        </div>
                    </div>
                </div>
            </Header>
            <AccountContent></AccountContent>
        </div>
    );
};

export default Profile;
