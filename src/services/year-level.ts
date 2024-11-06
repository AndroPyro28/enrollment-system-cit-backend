import prisma from "../lib/prisma";
import { TCreateYearLevelSchema } from "../schema/year-level";

class YearLevelService {
  async get() {
    const yearLevels = await prisma.yearLevel.findMany({
      include: {
        sections:true
      }
    });
    return yearLevels
  }

  async createOne(body: TCreateYearLevelSchema) {
    const isExist = await prisma.yearLevel.findFirst({
      where: {
        name: body.name,
      },
    });

    if (isExist && isExist.id) {
      return Response.json(
        {
          message: "Year level already exist",
        },
        {
          status: 409,
        }
      );
    }

    const YearLevel = await prisma.yearLevel.create({
      data: {
        name: body.name,
      },
    });

    return Response.json(
      {
        data: YearLevel,
      },
      {
        status: 201,
      }
    );
  }
}

export default YearLevelService;
