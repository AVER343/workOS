import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FaChevronCircleRight } from 'react-icons/fa'

function BreadCrumbComponent(props: { items: { link: string, displayName: string }[] }) {
    const router = useRouter()
    useEffect(() => {
        console.log(router.asPath);
    }, [router.pathname]);

    return (<Breadcrumb spacing='8px' separator={<FaChevronCircleRight />}>
        {props.items.map((item, index) => <BreadcrumbItem>
            <BreadcrumbLink isCurrentPage={props.items.length - 1 == index} onClick={() => { router.push(item.link) }}>{item.displayName}</BreadcrumbLink>
        </BreadcrumbItem>)}
    </Breadcrumb>
    )
}

export default BreadCrumbComponent
