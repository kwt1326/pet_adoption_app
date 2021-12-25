import { User } from './user.entity';
import { AdoptUser } from './adopt-user.entity';
import { AdopteeUser } from './adoptee-user.entity';
import { AdminUser } from './admin-user.entity';
import { AuthenticateInfo } from './authenticate-info.entity';
import { Pets } from './pets.entity';
import { PetPicture } from './pet-picture.entity';
import { Comment } from './comment.entity';
import { Banner } from './banner.entity';
import { BannerContent } from './banner-content.entity';
import { AdoptionPost } from './adoption-post.entity';
import { AdoptionPostLike } from './adoption-post-like.entity';
import { AdoptUserPicture } from './adopt-user-picture.entity';
import { AdoptReview } from './adopt-review.entity';
import { AdoptReviewPicture } from './adopt-review-picture.entity';
import { AdoptionReviewLike } from './adopt-review-like.entity';

export default [
  User,
  AdoptUser,
  AdopteeUser,
  AdminUser,
  AuthenticateInfo,
  AdoptionPost,
  AdoptionPostLike,
  AdoptUserPicture,
  AdoptReviewPicture,
  AdoptionReviewLike,
  AdoptReview,
  Pets,
  PetPicture,
  Comment,
  Banner,
  BannerContent,
];
