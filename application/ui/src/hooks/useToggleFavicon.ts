import { useEffect } from 'react';

const useToggleFavicon = (isRotPositive: boolean) => {
    useEffect(() => {
        const link = document.querySelector(
            "link[rel*='icon']"
        ) as HTMLLinkElement;

        if (link) {
            link.href = isRotPositive
                ? '/yellow-skull-with-laurel-wreath.png'
                : '/black-skull-with-laurel-wreath.png';
        }
    }, [isRotPositive]);
};

export default useToggleFavicon;
