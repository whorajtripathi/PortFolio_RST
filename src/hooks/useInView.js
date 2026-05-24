// This hook returns `true` when the given element is visible
// in the viewport — great for scroll animations!

import {useEffect, useState} from 'react';

function useInView(ref,threshold=0.1){

    const [isInView,setIsInView]=useState(false);

    useEffect(()=>{
        const observer=new IntersectionObserver(
            ([entry])=>{
                if(entry.isIntersecting){
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            {threshold}
        );

        const element=ref.current;
        if(element) observer.observe(element);

        return ()=>{
            if(element) observer.unobserve(element);
        };
    },[ref,threshold]);
    return isInView;
}

export default useInView;