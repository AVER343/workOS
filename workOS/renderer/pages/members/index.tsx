import React from 'react'
import MemberContainer from '../../container/member'
import LayoutContainer from '../../layout'

function MembersPage() {
    return <LayoutContainer
        parentUrl={"/home"}
        parentName={`Home`}
        parentIcon={"home"}
    ><MemberContainer /></LayoutContainer>

}
export default MembersPage