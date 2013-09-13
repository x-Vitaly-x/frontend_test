#!/bin/env ruby
# encoding: utf-8

class BooksController < ApplicationController

  def index
    respond_to do |format|
      format.json {
        page = params[:page] || 1
        books = Rails.configuration.savon_client.call(:search, xml: render_to_string(:partial => "books/json_search", :locals => {search: params[:search], page: page}, :formats => [:xml]))
        if books.as_json[:search_response][:return][:success]
          response = books.as_json[:search_response][:return][:books]
        else
          response = []
        end
        render :json => response
      }
      format.html
    end
  end

  def show
    @id = params[:id]
    respond_to do |format|
      format.json {
        book = Rails.configuration.savon_client.call(:get_book_by_ppn, xml: render_to_string(:partial => "books/get_book_by_ppn", :locals => {ppn: @id}, :formats => [:xml]))
        if book.as_json[:get_book_by_ppn_response][:return][:success]
          response = book.as_json[:get_book_by_ppn_response][:return]
        else
          response = nil
        end
        render :json => response
      }
      format.html
    end
  end

end