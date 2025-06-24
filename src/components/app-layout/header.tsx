"use client"
import Logo from "../shared/logo";
import { MainNav } from "../navigation/main-nav";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "../shared/refetch";
import SearchForm from "../shared/searchForm";


export default function Header() {

  const { data: menu, isLoading, refetch, isFetching, isError } = useSetting(`menu-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  return (
     <header className="bg-transparent border-t-8 sm:border-t-4 border-t-[#850000]"> 
        <nav className="px-[5%] flex flex-wrap items-center justify-between py-2 gap-y-2 backdrop-blur-sm lg:backdrop-blur-none">
            <div className="flex items-center">
                <Logo/>
            </div>
            <div className="flex items-center space-x-4">
            {   
                    isLoading ? (
                        <div className="flex animate-pulse space-x-3">
                            <div className="hidden md:flex flex-row gap-x-6">
                                <div className=" h-4 w-24 rounded bg-gray-200"></div>
                                <div className="h-4 w-24 rounded bg-gray-200"></div>
                                <div className="h-4 w-24 rounded bg-gray-200"></div>
                                <div className="h-4 w-24 rounded bg-gray-200"></div>
                            </div>
                            <div className="flex md:hidden flex-row gap-x-6">
                                <div className="h-10 w-10 rounded-2xl bg-gray-200"></div>
                            </div>
                        </div>
                    ) : isError && !isFetching  ? (
                        <Refetch refetch={refetch} />
                    ) : (
                        <MainNav menuData={(menu?.value?.length > 0) ? menu.value
                            :  [
                                {
                                    "order": 1,
                                    "title": "Home",
                                    "route": "/",
                                    "staticPage": null,
                                    "child": null
                                },
                                {
                                    "order": 2,
                                    "title": "Artikel",
                                    "route": "/article",
                                    "staticPage": null,
                                    "child": null
                                }
                            ]}  
                        />
                    )
                }
            </div>
            <div className="hidden lg:flex items-center justify-between w-full lg:w-3xs md:order-3">
                <SearchForm/>
            </div>
        </nav>
    </header>
  );
}
