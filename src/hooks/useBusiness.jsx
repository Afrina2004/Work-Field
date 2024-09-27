import { useEffect, useState } from "react";

const useBusiness = () => {
    const [business,setBusiness] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://work-field-server.vercel.app/business`)
            .then(res => res.json())
            .then(data => {
                setBusiness(data);
                setLoading(false);
            });
    }, [])
    return [business, loading]
}

export default useBusiness;