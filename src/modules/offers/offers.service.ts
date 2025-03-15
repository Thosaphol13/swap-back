import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Offer } from './offer.entity';
import { OFFER_STATUS_ENUM } from 'src/enums/offer_status.enum';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const { name, from_user_id, to_user_id, product_id, description, status, image, price, deliveryType } = createOfferDto;
    
    console.log('Received DTO:', createOfferDto); // Debug log
  
    try {
      const fromUser = await this.userRepository.findOneBy({ id: from_user_id });
      if (!fromUser) {
        throw new NotFoundException('Sender user not found');
      }
  
      const toUser = await this.userRepository.findOneBy({ id: to_user_id });
      if (!toUser) {
        throw new NotFoundException('Receiver user not found');
      }
  
      const product = await this.productRepository.findOneBy({ id: product_id });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
  
      const offer = this.offerRepository.create({
        name,
        description,
        status: status || OFFER_STATUS_ENUM.PENDING,
        image,  // นำหลายภาพมาจัดเก็บ
        price,
        fromUser,
        toUser,
        product,
        deliveryType,
      });
  
      console.log('Offer entity:', offer); // Debug log
  
      return await this.offerRepository.save(offer);
    } catch (error) {
      console.error('Error creating offer:', error.message);
      throw new InternalServerErrorException('An error occurred while creating the offer.');
    }
  }
  
  
  

  async getOfferById(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['fromUser', 'toUser', 'product'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }
    return offer;
  }

  async getOffers(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: ['fromUser', 'toUser', 'product'],
    });
  }

  async acceptOffer(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['fromUser', 'toUser', 'product'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    offer.status = OFFER_STATUS_ENUM.ACCEPTED;
    return this.offerRepository.save(offer);
  }

  async rejectOffer(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['fromUser', 'toUser', 'product'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    offer.status = OFFER_STATUS_ENUM.REJECTED;
    return this.offerRepository.save(offer);
  }

  async getOffersByUserId(user_id: number): Promise<Offer[]> {
    const offers = await this.offerRepository.find({
      where: { toUser: { id: user_id } },
      relations: ['fromUser', 'toUser', 'product'],
    });
  
    if (!offers.length) {
      throw new NotFoundException('No offers found for this user');
    }
    return offers;
  }

  
  async getOffersBySenderId(user_id: number): Promise<Offer[]> {
    const offers = await this.offerRepository.find({
      where: { fromUser: { id: user_id } },
      relations: ['fromUser', 'toUser', 'product'],
    });
  
    if (!offers.length) {
      throw new NotFoundException('No offers found for this user');
    }
    return offers;
  }
  
  async getOffersByReceiverId(user_id: number): Promise<Offer[]> {
    const offers = await this.offerRepository.find({
      where: { toUser: { id: user_id } },
      relations: ['fromUser', 'toUser', 'product'],
      order: { createdAt: 'DESC' },
    });
  
    if (!offers.length) {
      throw new NotFoundException('No offers found for this user');
    }
    return offers;
  }
  async updateDeliveryType(offerId: number, deliveryType: 'IN_PERSON' | 'REMOTE'): Promise<Offer> {
    const offer = await this.offerRepository.findOneBy({ id: offerId });
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${offerId} not found`);
    }
    offer.deliveryType = deliveryType;
    return await this.offerRepository.save(offer);
  }
}
