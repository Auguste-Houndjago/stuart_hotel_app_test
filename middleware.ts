import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes:['/','hotel-details/:id', '/api/uploadthing'],

    //  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/github-markdown-css"]
});


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};