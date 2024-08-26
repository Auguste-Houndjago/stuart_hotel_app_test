import { Input } from "@/components/ui/input"

import { Search } from 'lucide-react';

import LordIcon from '@Components/ui/LordIcon';


const SearchInput = () => {
    return ( 
        <div className="relative sm:block hidden ">
             {/* <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" /> */}

             <span className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" >
                 <LordIcon
                 
                     src="https://cdn.lordicon.com/pagmnkiz.json"
                     trigger="hover"
                     style={{width: "16px", height: "16px"}}
                     size="16px"
                 />
             </span>
                <Input placeholder="search" className="pl-10 bg-primary/10"  />

        </div>
     );
}
 
export default SearchInput ;