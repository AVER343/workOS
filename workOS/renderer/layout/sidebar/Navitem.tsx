import React, { useEffect, useState } from 'react';
import { Flex, Text, Icon, Link, Menu, MenuButton, MenuList, useDisclosure, Box } from '@chakra-ui/react';
import NavHoverBox from './NavHoverBox';
import { useRouter } from 'next/router';
interface NavItemI {
    icon: any;
    title: string;
    description: string;
    navSize: any;
    href: string;
    active: boolean;
}
export default function NavItem({ icon, active, title, description, href, navSize }: NavItemI) {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Flex
            onClick={() => router.push(href)}
            mt={30}
            flexDir='column'
            w='100%'
            alignItems={navSize == 'small' ? 'center' : 'flex-start'}
            className='unselectable'
        >
            <Menu placement='right'>
                <Link
                    backgroundColor={'gray.300'}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
                    onClick={() => router.push(href)}
                    w={navSize == 'large' ? '100%' : '60%'}
                >
                    <MenuButton w='100%'>
                        <Flex>
                            <Icon as={icon} fontSize='xl' color={active ? '#82AAAD' : 'gray.500'} />
                            <Text ml={5} display={navSize == 'small' ? 'none' : 'flex'}>
                                {title}
                            </Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    );
}