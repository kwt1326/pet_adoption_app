import { AdoptReview } from "src/entities/adopt-review.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(AdoptReview)
export class AdoptReviewRepository extends Repository<AdoptReview>{

}