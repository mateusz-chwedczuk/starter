import { ICurrentUser } from "../types/current-user.interface";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser: () => ParameterDecorator = createParamDecorator(
  (data: unknown, req: ExecutionContext) => {
    switch ((req as any).contextType) {
      case "http":
        return req.switchToHttp().getRequest().user as ICurrentUser;
      case "graphql":
        return GqlExecutionContext.create(req).getContext()
          .user as ICurrentUser;
      default:
        return undefined;
    }
  },
);
